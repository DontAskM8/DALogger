# How to use this node module
1. Install the node module using `npm i dalogger --save`
2. Go fancy

# Methods
Color is optional. If not inputted, default value will be used

### status(...text)
> [HH:MM:SS:sss] Status: Text

Text is what you want it to output  
Color is the color you want `Status: ` in.  
Default: Green

### trade(...text)
> [HH:MM:SS:sss] Trade: Text

Text is what you want it to output  
Color is the color you want `Trade: ` in.  
Default: Magenta

### alert(...text)
> [HH:MM:SS:sss] Alert: Text

Text is what you want it to output  
Color is the color you want `Alert: ` in.  
Default: Yellow

### confirm(...text)
> [HH:MM:SS:sss] Confirmation: Text

Text is what you want it to output  
Color is the color you want `Confirmation: ` in.  
Default: Cyan

### error(...text)
> [HH:MM:SS:sss] Error: Text

Text is what you want it to output  
Color is the color you want `Error: ` in.  
Default: Red

### item(text)
> (Text)

Text is what you want it to output  
Color is the color you want `( )` in.  
Default: Green

### warn(...text1)
> [HH:MM:SS:sss] Warn: Text

Text is what you want it to output  
Color1 is the color you want `Warn: ` in.  
Color2 is the color you want `Text` in.  
Default: Yellow, Red

### time()
> [HH:MM:SS:sss]

Returns current time for your own use