# Travis encrypted files

This directory contains a public/private keypair generated just for this repository.

The public key is a deploy key which has been added to the GitHub repo for push access.

The private key is encrypted using `travis encrypt-file` and then committed to this repo.

The decrypt commands are in `.travis.yml`.

To regenerate a key:

```
ssh-keygen -b 4096 -f .travis/idsk_elements # Make a new keypair
travis encrypt-file .travis/idsk_elements # Encrypt the private key
mv idsk_elements.enc .travis/ # Move the private key to the right place
rm .travis/idsk_elements # Remove the unencrypted private key
```
