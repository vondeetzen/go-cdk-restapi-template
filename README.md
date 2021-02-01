This is my template for developing a go and AWS bases Rest API using CDK.
Maybe it is helpful for you too.

## Features

* Sample Go based Lambda
* Automated CDK deployment
* Rest-API with usage quote (100 requests per day, sane default)
* Everything automated with a Makefile

## Multifactor-Authentication / Profiles

If your organization requires you to use 2FA / MFA with your AWS account and you also have to use it with CDK check out https://github.com/hupe1980/cdk-multi-profile-plugin
