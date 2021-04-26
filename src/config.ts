/* eslint-disable indent */
/* eslint-disable no-multi-spaces */

/**
 * Configuration interface definition for **Human** library
 *
 * Contains all configurable parameters
 */
export interface Config {
  /** Backend used for TFJS operations */
  backend: null | '' | 'cpu' | 'wasm' | 'webgl' | 'humangl' | 'tensorflow',

  /** Path to *.wasm files if backend is set to `wasm` */
  wasmPath: string,

  /** Print debug statements to console */
  debug: boolean,

  /** Perform model loading and inference concurrently or sequentially */
  async: boolean,

  /** Perform additional optimizations when input is video,
   * - must be disabled for images
   * - automatically disabled for Image, ImageData, ImageBitmap and Tensor inputs
   * - skips boundary detection for every `skipFrames` frames specified for each model
   * - while maintaining in-box detection since objects don't change definition as fast */
  videoOptimized: boolean,

  /** What to use for `human.warmup()`
   * - warmup pre-initializes all models for faster inference but can take significant time on startup
   * - only used for `webgl` and `humangl` backends
  */
  warmup: 'none' | 'face' | 'full' | 'body',

  /** Base model path (typically starting with file://, http:// or https://) for all models
   * - individual modelPath values are relative to this path
  */
  modelBasePath: string,

  /** Run input through image filters before inference
   * - image filters run with near-zero latency as they are executed on the GPU
  */
  filter: {
    enabled: boolean,
    /** Resize input width
    * - if both width and height are set to 0, there is no resizing
    * - if just one is set, second one is scaled automatically
    * - if both are set, values are used as-is
    */
    width: number,
    /** Resize input height
    * - if both width and height are set to 0, there is no resizing
    * - if just one is set, second one is scaled automatically
    * - if both are set, values are used as-is
    */
    height: number,
    /** Return processed canvas imagedata in result */
    return: boolean,
    /** Flip input as mirror image */
    flip: boolean,
    /** Range: -1 (darken) to 1 (lighten) */
    brightness: number,
    /** Range: -1 (reduce contrast) to 1 (increase contrast) */
    contrast: number,
    /** Range: 0 (no sharpening) to 1 (maximum sharpening) */
    sharpness: number,
    /** Range: 0 (no blur) to N (blur radius in pixels) */
    blur: number
    /** Range: -1 (reduce saturation) to 1 (increase saturation) */
    saturation: number,
    /** Range: 0 (no change) to 360 (hue rotation in degrees) */
    hue: number,
    /** Image negative */
    negative: boolean,
    /** Image sepia colors */
    sepia: boolean,
    /** Image vintage colors */
    vintage: boolean,
    /** Image kodachrome colors */
    kodachrome: boolean,
    /** Image technicolor colors */
    technicolor: boolean,
    /** Image polaroid camera effect */
    polaroid: boolean,
    /** Range: 0 (no pixelate) to N (number of pixels to pixelate) */
    pixelate: number,
  },
  // type definition end

  /** Controlls gesture detection */
  gesture: {
    enabled: boolean,
  },

  /** Controlls and configures all face-specific options:
   * - face detection, face mesh detection, age, gender, emotion detection and face description
   * Parameters:
   * - enabled: true/false
   * - modelPath: path for each of face models
   * - minConfidence: threshold for discarding a prediction
   * - iouThreshold: ammount of overlap between two detected objects before one object is removed
   * - maxDetected: maximum number of faces detected in the input, should be set to the minimum number for performance
   * - rotation: use calculated rotated face image or just box with rotation as-is, false means higher performance, but incorrect mesh mapping on higher face angles
   * - skipFrames: how many frames to go without re-running the face detector and just run modified face mesh analysis, only valid if videoOptimized is set to true
   * - skipInitial: if previous detection resulted in no faces detected, should skipFrames be reset immediately to force new detection cycle
   * - return: return extracted face as tensor for futher user processing
  */
  face: {
    enabled: boolean,
    detector: {
      modelPath: string,
      rotation: boolean,
      maxDetected: number,
      skipFrames: number,
      skipInitial: boolean,
      minConfidence: number,
      iouThreshold: number,
      return: boolean,
    },
    mesh: {
      enabled: boolean,
      modelPath: string,
    },
    iris: {
      enabled: boolean,
      modelPath: string,
    },
    description: {
      enabled: boolean,
      modelPath: string,
      skipFrames: number,
      minConfidence: number,
    },
    emotion: {
      enabled: boolean,
      minConfidence: number,
      skipFrames: number,
      modelPath: string,
    },
  },

  /** Controlls and configures all body detection specific options
   * - enabled: true/false
   * - modelPath: body pose model, can be absolute path or relative to modelBasePath
   * - minConfidence: threshold for discarding a prediction
   * - maxDetected: maximum number of people detected in the input, should be set to the minimum number for performance
  */
  body: {
    enabled: boolean,
    modelPath: string,
    maxDetected: number,
    minConfidence: number,
  },

  /** Controlls and configures all hand detection specific options
   * - enabled: true/false
   * - landmarks: detect hand landmarks or just hand boundary box
   * - modelPath: paths for hand detector and hand skeleton models, can be absolute path or relative to modelBasePath
   * - minConfidence: threshold for discarding a prediction
   * - iouThreshold: ammount of overlap between two detected objects before one object is removed
   * - maxDetected: maximum number of hands detected in the input, should be set to the minimum number for performance
   * - rotation: use best-guess rotated hand image or just box with rotation as-is, false means higher performance, but incorrect finger mapping if hand is inverted
   * - skipFrames: how many frames to go without re-running the hand bounding box detector and just run modified hand skeleton detector, only valid if videoOptimized is set to true
   * - skipInitial: if previous detection resulted in no hands detected, should skipFrames be reset immediately to force new detection cycle
  */
  hand: {
    enabled: boolean,
    rotation: boolean,
    skipFrames: number,
    skipInitial: boolean,
    minConfidence: number,
    iouThreshold: number,
    maxDetected: number,
    landmarks: boolean,
    detector: {
      modelPath: string,
    },
    skeleton: {
      modelPath: string,
    },
  },

  /** Controlls and configures all object detection specific options
   * - enabled: true/false
   * - modelPath: object detection model, can be absolute path or relative to modelBasePath
   * - minConfidence: minimum score that detection must have to return as valid object
   * - iouThreshold: ammount of overlap between two detected objects before one object is removed
   * - maxDetected: maximum number of detections to return
   * - skipFrames: run object detection every n input frames, only valid if videoOptimized is set to true
  */
  object: {
    enabled: boolean,
    modelPath: string,
    minConfidence: number,
    iouThreshold: number,
    maxDetected: number,
    skipFrames: number,
  },
}

const config: Config = {
  backend: 'webgl',          // select tfjs backend to use, leave empty to use default backend
                             // can be 'webgl', 'wasm', 'cpu', or 'humangl' which is a custom version of webgl
  modelBasePath: '../models/', // base path for all models
  wasmPath: '../assets/',    // path for wasm binariesm, only used for backend: wasm
  debug: true,               // print additional status messages to console
  async: true,               // execute enabled models in parallel
  videoOptimized: true,      // perform additional optimizations when input is video,
                             // automatically disabled for Image, ImageData, ImageBitmap
                             // skips boundary detection for every n frames
                             // while maintaining in-box detection since objects cannot move that fast
  warmup: 'full',            // what to use for human.warmup(), can be 'none', 'face', 'full'
                             // warmup pre-initializes all models for faster inference but can take
                             // significant time on startup
                             // only used for `webgl` and `humangl` backends
  filter: {                  // run input through image filters before inference
                             // image filters run with near-zero latency as they are executed on the GPU
    enabled: true,           // enable image pre-processing filters
    width: 0,                // resize input width
    height: 0,               // resize input height
                             // if both width and height are set to 0, there is no resizing
                             // if just one is set, second one is scaled automatically
                             // if both are set, values are used as-is
    flip: false,             // flip input as mirror image
    return: true,            // return processed canvas imagedata in result
    brightness: 0,           // range: -1 (darken) to 1 (lighten)
    contrast: 0,             // range: -1 (reduce contrast) to 1 (increase contrast)
    sharpness: 0,            // range: 0 (no sharpening) to 1 (maximum sharpening)
    blur: 0,                 // range: 0 (no blur) to N (blur radius in pixels)
    saturation: 0,           // range: -1 (reduce saturation) to 1 (increase saturation)
    hue: 0,                  // range: 0 (no change) to 360 (hue rotation in degrees)
    negative: false,         // image negative
    sepia: false,            // image sepia colors
    vintage: false,          // image vintage colors
    kodachrome: false,       // image kodachrome colors
    technicolor: false,      // image technicolor colors
    polaroid: false,         // image polaroid camera effect
    pixelate: 0,             // range: 0 (no pixelate) to N (number of pixels to pixelate)
  },

  gesture: {
    enabled: true,           // enable gesture recognition based on model results
  },

  face: {
    enabled: true,           // controls if specified modul is enabled
                             // face.enabled is required for all face models:
                             // detector, mesh, iris, age, gender, emotion
                             // (note: module is not loaded until it is required)
    detector: {
      modelPath: 'blazeface.json', // detector model, can be absolute path or relative to modelBasePath
      rotation: false,       // use best-guess rotated face image or just box with rotation as-is
                             // false means higher performance, but incorrect mesh mapping if face angle is above 20 degrees
                             // this parameter is not valid in nodejs
      maxDetected: 10,          // maximum number of faces detected in the input
                             // should be set to the minimum number for performance
      skipFrames: 21,        // how many frames to go without re-running the face bounding box detector
                             // only used for video inputs
                             // e.g., if model is running st 25 FPS, we can re-use existing bounding
                             // box for updated face analysis as the head probably hasn't moved much
                             // in short time (10 * 1/25 = 0.25 sec)
      skipInitial: false,    // if previous detection resulted in no faces detected,
                             // should skipFrames be reset immediately to force new detection cycle
      minConfidence: 0.2,    // threshold for discarding a prediction
      iouThreshold: 0.1,     // ammount of overlap between two detected objects before one object is removed
      return: false,         // return extracted face as tensor
    },

    mesh: {
      enabled: true,
      modelPath: 'facemesh.json',  // facemesh model, can be absolute path or relative to modelBasePath
    },

    iris: {
      enabled: true,
      modelPath: 'iris.json',  // face iris model
                             // can be either absolute path or relative to modelBasePath
    },

    description: {
      enabled: true,         // to improve accuracy of face description extraction it is
                             // recommended to enable detector.rotation and mesh.enabled
      modelPath: 'faceres.json',  // face description model
                             // can be either absolute path or relative to modelBasePath
      skipFrames: 31,        // how many frames to go without re-running the detector
                             // only used for video inputs
      minConfidence: 0.1,    // threshold for discarding a prediction
    },

    emotion: {
      enabled: true,
      minConfidence: 0.1,    // threshold for discarding a prediction
      skipFrames: 32,        // how many frames to go without re-running the detector
      modelPath: 'emotion.json',  // face emotion model, can be absolute path or relative to modelBasePath
    },
  },

  body: {
    enabled: true,
    modelPath: 'posenet.json',  // body model, can be absolute path or relative to modelBasePath
                             // can be 'posenet' or 'blazepose'
    maxDetected: 1,          // maximum number of people detected in the input
                             // should be set to the minimum number for performance
                             // only valid for posenet as blazepose only detects single pose
    minConfidence: 0.2,      // threshold for discarding a prediction
  },

  hand: {
    enabled: true,
    rotation: false,         // use best-guess rotated hand image or just box with rotation as-is
                             // false means higher performance, but incorrect finger mapping if hand is inverted
    skipFrames: 12,          // how many frames to go without re-running the hand bounding box detector
                             // only used for video inputs
                             // e.g., if model is running st 25 FPS, we can re-use existing bounding
                             // box for updated hand skeleton analysis as the hand probably
                             // hasn't moved much in short time (10 * 1/25 = 0.25 sec)
    skipInitial: false,      // if previous detection resulted in no hands detected,
                             // should skipFrames be reset immediately to force new detection cycle
    minConfidence: 0.1,      // threshold for discarding a prediction
    iouThreshold: 0.1,       // ammount of overlap between two detected objects before one object is removed
    maxDetected: 1,          // maximum number of hands detected in the input
                             // should be set to the minimum number for performance
    landmarks: true,         // detect hand landmarks or just hand boundary box
    detector: {
      modelPath: 'handdetect.json',  // hand detector model, can be absolute path or relative to modelBasePath
    },
    skeleton: {
      modelPath: 'handskeleton.json',  // hand skeleton model, can be absolute path or relative to modelBasePath
    },
  },

  object: {
    enabled: false,
    modelPath: 'nanodet.json',  // experimental: object detection model, can be absolute path or relative to modelBasePath
    minConfidence: 0.2,      // threshold for discarding a prediction
    iouThreshold: 0.4,       // ammount of overlap between two detected objects before one object is removed
    maxDetected: 10,         // maximum number of objects detected in the input
    skipFrames: 41,          // how many frames to go without re-running the detector
  },
};
export { config as defaults };
