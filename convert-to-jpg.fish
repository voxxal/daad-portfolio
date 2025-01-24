#!/usr/bin/fish

function convert_psd_to_jpg
    set -l source_dir "$argv[1]"
    set -l target_dir "$argv[2]"

    mkdir -p $target_dir

    for item in $source_dir/*
        # Get the base name of the item
        set -l base (basename "$item")

        # If item is a directory, recursively process it
        if test -d "$item"
            convert_psd_to_jpg "$item" "$target_dir/$base"

            # If item is a PSD file, convert to JPG
        else if string match -q '*.psd' (string lower "$item")
            set -l jpg_path (string replace '.psd' '.jpg' "$target_dir/$base")

            # Use ImageMagick to convert PSD to JPG
            convert (string join "" "$item" "[0]") "$jpg_path"

            echo "Converted: $item -> $jpg_path"

            # If it's not a PSD, just copy the file
        else if test -f "$item"
            cp "$item" "$target_dir/$base"
        end
    end
end

# Check if correct number of arguments is provided
if test (count $argv) -ne 2
    echo "Usage: fish convert-to-jpg.fish /path/to/source/directory /path/to/target/directory"
    exit 1
end

# Call the function with source and target directories
convert_psd_to_jpg "$argv[1]" "$argv[2]"

echo "Conversion complete!"
