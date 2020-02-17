
const Animation = require('Animation');
const Scene = require('Scene');
const TouchGestures = require('TouchGestures');

const sceneRoot = Scene.root;

const base = sceneRoot.find('base_jnt');
const speakerLeft = sceneRoot.find('speaker_left_jnt');
const speakerRight = sceneRoot.find('speaker_right_jnt');
const planeTracker = sceneRoot.find('planeTracker0');
const placer = sceneRoot.find('placer');

const baseDriverParameters = {
  durationMilliseconds: 400,
  loopCount: Infinity,
  mirror: true
};

const baseDriver = Animation.timeDriver(baseDriverParameters);
baseDriver.start();

const baseSampler = Animation.samplers.easeInQuint(0.9, 1);

const baseAnimation = Animation.animate(baseDriver, baseSampler);

const baseTransform = base.transform;

baseTransform.scaleX = baseAnimation;
baseTransform.scaleY = baseAnimation;
baseTransform.scaleZ = baseAnimation;

const speakerDriverParameters = {
  durationMilliseconds: 200,
  loopCount: Infinity,
  mirror: true
};

const speakerDriver = Animation.timeDriver(speakerDriverParameters);
speakerDriver.start();

const speakerSampler = Animation.samplers.easeOutElastic(0.7, 0.85);

const speakerAnimation = Animation.animate(speakerDriver, speakerSampler);

const speakerLeftTransform = speakerLeft.transform;

speakerLeftTransform.scaleX = speakerAnimation;
speakerLeftTransform.scaleY = speakerAnimation;
speakerLeftTransform.scaleZ = speakerAnimation;

const speakerRightTransform = speakerRight.transform;

speakerRightTransform.scaleX = speakerAnimation;
speakerRightTransform.scaleY = speakerAnimation;
speakerRightTransform.scaleZ = speakerAnimation;

TouchGestures.onPan().subscribe(function (gesture) {
  planeTracker.trackPoint(gesture.location, gesture.state);
});

const placerTransform = placer.transform;

TouchGestures.onPinch().subscribeWithSnapshot({
  'lastScaleX': placerTransform.scaleX,
  'lastScaleY': placerTransform.scaleY,
  'lastScaleZ': placerTransform.scaleZ
}, function (gesture, snapshot) {
  placerTransform.scaleX = gesture.scale.mul(snapshot.lastScaleX);
  placerTransform.scaleY = gesture.scale.mul(snapshot.lastScaleY);
  placerTransform.scaleZ = gesture.scale.mul(snapshot.lastScaleZ);
});

TouchGestures.onRotate().subscribeWithSnapshot({
  'lastRotationY': placerTransform.rotationY,
}, function (gesture, snapshot) {
  const correctRotation = gesture.rotation.mul(-1);
  placerTransform.rotationY = correctRotation.add(snapshot.lastRotationY);
});