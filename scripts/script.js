/**
 * (c) Facebook, Inc. and its affiliates. Confidential and proprietary.
 */

//==============================================================================
// Welcome to scripting in Spark AR Studio! Helpful links:
//
// Scripting Basics - https://fb.me/spark-scripting-basics
// Reactive Programming - https://fb.me/spark-reactive-programming
// Scripting Object Reference - https://fb.me/spark-scripting-reference
// Changelogs - https://fb.me/spark-changelog
//==============================================================================

const Animation = require('Animation');
const Scene = require('Scene');

const base = Scene.root.find('base_jnt');

const baseDriverParameters = {
  durationMilliseconds: 400,
  loopCount: Infinity,
  mirror: true
};

const baseDriver = Animation.timeDriver(baseDriverParameters);
baseDriver.start();
