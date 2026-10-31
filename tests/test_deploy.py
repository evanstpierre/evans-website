"""Exercise deployment ordering and rollback without a Docker daemon."""
import os
from pathlib import Path
import subprocess
import tempfile
import unittest

SCRIPT = Path(__file__).resolve().parents[1] / 'scripts/deploy.sh'
IMAGE = 'ghcr.io/evanstpierre/evans-website@sha256:' + 'a' * 64


class DeploymentTest(unittest.TestCase):
    def run_case(self, failure):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp).resolve()
            (root / '.env').touch()
            old = root / 'releases' / 'initial'
            old.mkdir(parents=True)
            (old / 'image').write_text('sha256:old\n')
            (old / 'compose.yml').write_text('old configuration')
            (root / 'current').symlink_to(old)
            source = root / 'candidate.yml'
            source.write_text('candidate configuration')
            binary = root / 'bin'
            binary.mkdir()
            docker = binary / 'docker'
            docker.write_text('''#!/usr/bin/env bash
printf '%s %s\\n' "$APP_IMAGE" "$*" >> "$LOG"
case "$*" in
  *"pull next-prod"*) [[ $FAILURE != pull ]];;
  *"up -d"*)
    if [[ $APP_IMAGE == ghcr.io/* ]]; then
      [[ $FAILURE != startup && $FAILURE != rollback ]]
    else
      [[ $FAILURE != rollback ]]
    fi;;
  *) exit 0;;
esac
''')
            docker.chmod(0o755)
            # macOS lacks flock; this test does not exercise Linux file locking.
            lock = binary / 'flock'
            lock.write_text('#!/bin/sh\nexit 0\n')
            lock.chmod(0o755)
            log = root / 'log'
            env = dict(os.environ, PATH=str(binary) + ':' + os.environ['PATH'],
                       LOG=str(log), FAILURE=failure)
            result = subprocess.run(['bash', str(SCRIPT), IMAGE, str(root),
                                     'website', str(source)], env=env,
                                    capture_output=True, text=True)
            commands = log.read_text()
            if failure == 'none':
                self.assertEqual(result.returncode, 0, result.stderr)
                self.assertEqual((root / 'current' / 'image').read_text().strip(), IMAGE)
                self.assertEqual((root / 'previous').resolve(), old)
            else:
                self.assertNotEqual(result.returncode, 0)
                self.assertEqual((root / 'current').resolve(), old)
            if failure == 'pull':
                self.assertNotIn('up -d', commands)
            if failure in ('startup', 'rollback'):
                self.assertIn('--pull never --wait --wait-timeout 120 next-prod', commands)
                self.assertIn('ROLLBACK FAILED' if failure == 'rollback' else
                              'Previous release is healthy again', result.stderr)
            self.assertNotIn(' build', commands)
            self.assertNotIn('tunnel', commands)

    def test_success(self):
        self.run_case('none')

    def test_failed_pull_leaves_running_app_untouched(self):
        self.run_case('pull')

    def test_failed_startup_restores_previous(self):
        self.run_case('startup')

    def test_failed_rollback_is_reported(self):
        self.run_case('rollback')


if __name__ == '__main__':
    unittest.main()
