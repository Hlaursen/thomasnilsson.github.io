---
published: true
---
In my bachelor project I need to analyze an audio file using C. However C isn't very good at opening audio files, especially not when it's from the iPhone's filesystem. Therefore I decided to use Swift/Obj-C to open the audio file, convert it into a float array, and then feed that data to C.

The lack of documentation on how to read an audio file like this, is however pretty suprising, and the fact that Apple constantly update the Swift syntax (rendering old code near unusable) doesn't help either!

Finally I solved the problem after looking at [this](https://stackoverflow.com/questions/40862803/swift-from-audiopcmbuffer-to-array) post on StackOverflow), and I figured I'd share it here.
_(Swift 4 Implementation)_ 
```swift
let audioFile = try! AVAudioFile(forReading: audioFileURL)
        let audioFileFormat = audioFile.fileFormat
        let audioFilePFormat = audioFile.processingFormat
        let audioFileLength = audioFile.length
        let audioFileSamplingRate = audioFile.fileFormat.sampleRate

        let audioBuffer = AVAudioPCMBuffer(pcmFormat: audioFilePFormat, frameCapacity: AVAudioFrameCount(audioFileLength))
        if let buffer = audioBuffer {
            do {
                try audioFile.read(into: buffer, frameCount: AVAudioFrameCount(audioFileLength))
                let channelData = buffer.floatChannelData![0]
                let arr = Array(UnsafeBufferPointer(start:channelData, count: Int(audioFileLength)))
                // Do something with the data in "arr"
            }
            catch {
                print("Error occured reading file into array.")
            }
        }
```
