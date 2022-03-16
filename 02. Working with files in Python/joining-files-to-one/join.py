from glob import glob

files = glob('*.txt')
length_dict = {}

for file in files:
    length_dict[file] = sum(1 for line in open(file))

sorted_length_dict = {key: val for key, val in sorted(length_dict.items(), key=lambda item: item[1])}

with open('joined.txt', 'w') as f:
    for _, (filename, length) in enumerate(sorted_length_dict.items()):
        f.write(filename)
        f.write('\n')
        f.write(str(length))
        f.write('\n')
        with open(filename) as f1:
            f.write(f1.read())
            f.write('\n')
