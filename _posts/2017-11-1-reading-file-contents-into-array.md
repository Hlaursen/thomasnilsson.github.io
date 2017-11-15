---
published: true
---
In my bachelor project I need to analyze an audio file using C. However C isn't very good at opening audio files, especially not when it's from the iPhone's filesystem. Therefore I decided to use Swift/Obj-C to open the audio file, convert it into a float array, and then feed that data to C.

The lack of documentation on how to read an audio file like this, is however pretty suprising, and the fact that Apple constantly update the Swift syntax (rendering old code near unusable) doesn't help either!

Finally I solved the problem after looking at [this](https://stackoverflow.com/questions/40862803/swift-from-audiopcmbuffer-to-array) post on StackOverflow), and I figured I'd share it here.
_(Swift 4 Implementation)_ 
```swift
func readAudio() -> [Double] {
    var result: [Double] = []
    let fileName = "audio.m4a"
    let filePath = getFilePath(fileName: fileName)
    let audioFileURL = filePath
    
    let audioFile = try! AVAudioFile(forReading: audioFileURL)
    let audioFilePFormat = audioFile.processingFormat
    let audioFileLength = audioFile.length

    let audioBuffer = AVAudioPCMBuffer(pcmFormat: audioFilePFormat, frameCapacity: AVAudioFrameCount(audioFileLength))
    if let buffer = audioBuffer {
        do {
            try audioFile.read(into: buffer, frameCount: AVAudioFrameCount(audioFileLength))
            let channelData = buffer.floatChannelData![0]
            let arr = Array(UnsafeBufferPointer(start:channelData, count: Int(audioFileLength)))
            
            result = arr.map {Double($0)}
            
        }
        catch {
            print("Error reading audio file: \(fileName)")
        }
    }
    return result
}
```

The same was true for acceleration data stored in .txt files. This wasn't as cumbersome, but I felt like putting this out there anyways.
_(Swift 4 Implementation)_ 
```swift
func readAcc(prefix: String) -> [Double] {
    var result: [Double] = []
    let fileName = "\(prefix)File.txt"
    let path = getFilePath(fileName: fileName)
    
    do {
        let content = try String(contentsOf: path, encoding: String.Encoding.utf8)
        let arr = content.components(separatedBy: ",")
        for x in arr {
            if let d = Double(x) {
                result.append(d)
            }
        }
    }
    catch {
        print("Read acc error")
    }
    return result
}
```