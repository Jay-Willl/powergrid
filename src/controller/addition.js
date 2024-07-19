const init = (k) => {
    var TMin = -Math.pow(2, k - 1);
    var TMax = Math.pow(2, k - 1) - 1;
    var length = Math.pow(2, k);
    var flowOffsetConst = Math.pow(2, k);

    const Index2Number = (index) => {
        return index - Math.pow(2, k - 1);
    }

    const Number2Index = (number) => {
        return number + Math.pow(2, k - 1);
    }

    var resultArr = Array.from({length}, () => Array.from({length}, () => 0));
    var flowArr = Array.from({length}, () => Array.from({length}, () => 0));
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length; j++) {
            let x = Index2Number(i);
            let y = Index2Number(j);
            if (x + y > TMax) {
                resultArr[i][j] = x + y - flowOffsetConst;
                flowArr[i][j] = 1;
            } else if (x + y < TMin) {
                resultArr[i][j] = x + y + flowOffsetConst;
                flowArr[i][j] = -1;
            } else {
                resultArr[i][j] = x + y;
            }
        }
    }

    return {
        arrLength: length,
        TMin: -Math.pow(2, k - 1),
        TMax: Math.pow(2, k - 1) - 1,
        resultArr: resultArr,
        flowArr: flowArr,
    }
}

const Number2B = (n, k) => {
    let info = init(k);
    if (n > info.TMax || n < info.TMin) {
        throw "number exceed range";
    }
    if (n === 0) {
        return "0".repeat(k);
    } else if (n === info.TMin) {
        return "1".repeat(k);
    }

    let strArr = new Array(k).fill(0);
    if (n < 0) {
        strArr[0] = 1;
        n = -n - 1;
    }
    let cnt = 0;
    while (n !== 0) {
        strArr[k - 1 - cnt] = n % 2;
        n = Math.floor(n / 2);
        cnt += 1;
    }
    return strArr.join('');
}

const B2Number = (str, k) => {
    var result = 0;
    for (let i = k - 1; i >= 0; i--) {  // i represents the index of the element in strArr
        if (i !== 0) {
            result += Number(str[i]) * Math.pow(2, (k - 1) - i);
        } else {
            result -= Number(str[i]) * Math.pow(2, (k - 1) - i);
        }
    }
    return result;
}

// init(4)
// console.log(Number2B(-8, 4));
// console.log(B2Number("1000", 4));

export {init, B2Number, Number2B}
