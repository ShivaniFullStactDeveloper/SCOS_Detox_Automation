# Detox Mobile Automation Project
 
## Project Overview

This project contains mobile automation testing using Detox for a React Native application. The purpose of this exercise is to learn and implement End-to-End (E2E) testing for mobile applications.
 
## Exercise Objective
 
- Understand Detox framework setup
- Learn mobile automation testing
- Write and execute test cases
- Validate application functionality
- Practice React Native test automation
 
## Technologies Used
 
- React Native
- Detox
- JavaScript
- TypeScript
- Jest
- Android Emulator
- iOS Simulator
 
## Project Structure
 
e2e/ → Detox test scripts  
src/ → Application source code  
android/ → Android configuration  
ios/ → iOS configuration  
 
## Implemented Test Scenarios
 
- Application launch validation
- User interaction testing
- UI element verification
- Navigation testing
- Authentication flow testing
- API validation testing
- Session handling testing
- End-to-End workflow validation
 
## Test Case Documentation

Google Sheet Test Cases Link:

[https://docs.google.com/spreadsheets/d/1CAMlQE0Sm1raNz8mWOoG6-4U3a3TYWZnRM-_byI7N0U/edit?usp=sharing]
 
## Installation Steps
 
### Install dependencies
 
```bash
npm install
```
 
### Run Metro
 
```bash
npx react-native start --reset-cache
```
 
### Run Android
 
```bash
npx react-native run-android
```
 
### Run iOS
 
```bash
npx react-native run-ios
```
 
### Build Detox
 
```bash
detox build --configuration ios.sim.debug
```
 
### Run Detox Tests
 
```bash
detox test --configuration ios.sim.debug
```

## Test Execution Status
 
 --Detox setup completed  
 --Test cases implemented  
 --Automation execution successful  
 --Authentication testing completed  
 --UI validation completed  
 --API testing completed  
 
## Learning Outcomes
 
- Understanding Detox framework
- Mobile automation basics
- End-to-End testing concepts
- Test execution process
- Automation workflow
- React Native testing
- API validation testing
- Reusable test utilities
 
## Author
 
 Shivani Kharpuriya
