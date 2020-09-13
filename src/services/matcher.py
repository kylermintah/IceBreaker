import sys 
import random 
from itertools import combinations
def get_random_pairs(identifiers): 
#   # Generate all possible non-repeating pairs 
#   pairs = list(combinations(identifiers, 2)) 
#   # Randomly shuffle these pairs 
#   random.shuffle(pairs) 
    pairs = {}
    avatar =''
    if len(identifiers)%2==1:
        avatar += str(identifiers.pop(random.randrange(len(identifiers))))

    for p in range(len(identifiers) // 2):
      pairs[str(p+1)] = ( identifiers.pop(random.randrange(len(identifiers))),
        identifiers.pop(random.randrange(len(identifiers))) )

    resultString = ''

    for pair in pairs.items():
        id_tuple = pair[1]
        resultString += id_tuple[0] + ' : ' +id_tuple[1] +'<br><br>'

    if len(avatar)>0:
        resultString += avatar + ' gets to be the avatar :-)'
    
    return resultString

print(get_random_pairs(str(sys.argv[1]).splitlines()))

sys.stdout.flush()