export const getRandomInt = function (max) {
    return Math.floor(Math.random() * Math.floor(max));
}

export const findDupl = function (arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        const indexOfduple = arr.slice(i + 1).find(Obj => Obj.id === arr[i].id);

        if (indexOfduple !== undefined) {

            return indexOfduple.id;
        }

    }

    return false;
}