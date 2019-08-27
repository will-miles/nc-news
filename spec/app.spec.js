process.env.NODE_ENV = 'test';
const app = require('../app');
const request = require('supertest');
const chai = require('chai');
const { expect } = require('chai');
const connetion = require('../db/connection');
