#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting local CI test run...${NC}\n"

# Create necessary directories
echo "Creating test directories..."
mkdir -p test-results/coverage
mkdir -p playwright-report
mkdir -p test-report
chmod -R 777 test-results playwright-report test-report

# Install Playwright if not already installed
echo -e "\n${GREEN}Installing/Updating Playwright...${NC}"
npx playwright install chromium --with-deps
npx playwright install-deps chromium

# Verify test files
echo -e "\n${GREEN}Verifying test files...${NC}"
ls -la test/
echo "Test file contents:"
ls -la test/*.test.ts

# Run tests with debug output
echo -e "\n${GREEN}Running tests with debug output...${NC}"
export CI=true
export DEBUG='web-test-runner:*'
export NODE_DEBUG='test'
export WTR_OUTPUT_DIR='./test-results'
export NODE_OPTIONS='--experimental-vm-modules --no-warnings'
export WTR_DEBUG=1

npm test

# Check test results
echo -e "\n${GREEN}Verifying test results...${NC}"
echo "Test results files:"
find test-results -type f || true
echo "Playwright report files:"
find playwright-report -type f || true
echo "Test report files:"
find test-report -type f || true

# Run build if tests pass
if [ $? -eq 0 ]; then
    echo -e "\n${GREEN}Tests passed! Running build...${NC}"
    npm run build
    if [ $? -eq 0 ]; then
        echo -e "\n${GREEN}Build successful!${NC}"
    else
        echo -e "\n${RED}Build failed!${NC}"
        exit 1
    fi
else
    echo -e "\n${RED}Tests failed!${NC}"
    exit 1
fi 