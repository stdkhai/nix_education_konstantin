/* task 1 */
const searchCandidatesByPhoneNumber = phone => {
    let res = []
    if (phone != null) {
        phone = phone.replace(/[^\d]/g, '')
    }

    condidateArr.forEach(e => {
        if (e.phone != null) {
            temp = e.phone.replace(/[^\d]/g, '')
        }
        if (temp.indexOf(phone) != -1) {
            res.push(e)
        }
    });
    return res
}

console.log(searchCandidatesByPhoneNumber('43'));
searchCandidatesByPhoneNumber('+1(869) 40')
searchCandidatesByPhoneNumber('43')
searchCandidatesByPhoneNumber('+1(869)408-39-82')


/* task 2 */

const getCandidateById = id => {
    let res
    if (id != null) {
        condidateArr.forEach(e => {
            if (e._id == id) {
                if (e.registered != null) {
                    res = e
                }
            }
        });
        let date = new Date(res.registered);
        res.registered = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`
        return res
    }

}
console.log(getCandidateById('5e216bc9a6059760578aefa4'));


/* task 3 */

const sortCandidatesArr = sortBy => {
    let sorted = condidateArr.slice()
    switch (sortBy) {
        case 'asc':
            sorted.sort((a, b) => a.balance > b.balance ? 1 : -1);
            return sorted
        case 'desc':
            sorted.sort((a, b) => a.balance < b.balance ? 1 : -1);
            return sorted
        default:
            return condidateArr
            
    }
}
console.log(sortCandidatesArr('asc'));
console.log(sortCandidatesArr('desc'));
console.log(sortCandidatesArr()); 

/* task 4 */

const getEyeColorMap = () => {
    let sorted = []
    condidateArr.forEach(e => {
        if (sorted[e.eyeColor]==null) {
            sorted[e.eyeColor]=[]
        }
        sorted[e.eyeColor].push(e)
    });
    return sorted
}
console.log(getEyeColorMap());

// {
//    grey:  [Candidate, Candidate, Candidate, Candidate ...],
//    blue:  [Candidate, Candidate, Candidate, ...],
//    green: [Candidate, Candidate, Candidate, Candidate, Candidate ...]
//    ... etc.
// }