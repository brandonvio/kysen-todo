#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkApp02Stack } from '../lib/cdk-app-02-stack';

const app = new cdk.App();
new CdkApp02Stack(app, 'CdkApp02Stack');
