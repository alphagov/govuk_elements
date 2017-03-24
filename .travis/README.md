# Travis encrypted files

This directory contains a public/private keypair generated just for this repository.

The public key is a deploy key which has been added to the GitHub repo for push access.

The private key is encrypted using `travis encrypt-file` and then committed to this repo.

The decrypt commands are in `.travis.yml`.

To regenerate a key:

```
ssh-keygen -b 4096 -f .travis/govuk_elements # Make a new keypair
travis encrypt-file .travis/govuk_elements # Encrypt the private key
mv govuk_elements.enc .travis/ # Move the private key to the right place
rm .travis/govuk_elements # Remove the unencrypted private key
```
