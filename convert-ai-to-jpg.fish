#!/usr/bin/fish

# Function to recursively copy directory structure and convert AI files
function convert_ai_to_jpg
    set -l source_dir $argv[1]
    set -l target_dir $argv[2]

    # Create the target directory if it doesn't exist
    mkdir -p $target_dir

    # Loop through all items in the source directory
    for item in $source_dir/*
        # Get the base name of the item
        set -l base (basename "$item")
        
        # If item is a directory, recursively process it
        if test -d "$item"
            convert_ai_to_jpg "$item" "$target_dir/$base"
        
        # If item is an AI file, convert to JPG
        else if string match -q '*.ai' (string lower "$item")
            set -l jpg_path (string replace '.ai' '.jpg' "$target_dir/$base")
            
            # Use ImageMagick to convert AI to JPG
            # The density flag improves quality for vector graphics
            convert -density 300 "$item" "$jpg_path"
            
            echo "Converted: $item -> $jpg_path"
        
        # If it's not an AI file, just copy the file
        else if test -f "$item"
            cp "$item" "$target_dir/$base"
        end
    end
end

# Check if correct number of arguments is provided
if test (count $argv) -ne 2
    echo "Usage: fish convert_ai_to_jpg.fish /path/to/source/directory /path/to/target/directory"
    exit 1
end

# Call the function with source and target directories
convert_ai_to_jpg "$argv[1]" "$argv[2]"

echo "Conversion complete!"