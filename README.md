# inpsyde-wp-plugin
An arbitary wordpress plugin for Inpsyde

## Testing Strategy
There could be many types of cases around this plugin, but the ones that probably I am targetting would be unit test and integration tests -- Or atleast I am planning to.

### 1. Unit Tests

### 2. Integration Tests
- Tries to load containers:
    - wordpress
    - database
    - test content container
- Install an arbitary wordpress in that setup, with custom user and password
- Later can add a test layer of Cypress for automated UI tests
- Change the base URL so that after test, the environment could be used on local machine