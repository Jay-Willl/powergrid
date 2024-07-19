/**
 *
 * k : 阶码位的位数
 * n : 尾数位的位数
 * K : 规格化情况下阶码的个数
 * N : 尾数的个数
 * e : 假定阶码位是一个无符号整数时所表示的值
 * E : 经过偏置后阶码位实际表示的值
 * Bias : 偏置值
 * f : frac | 未经处理的小数值 | [0, 1)
 * M : Mantissa | 经过处理后的小数值 | [0, 1) (denorm), [1, 2) (norm)
 * V : result value in decimal | 使用十进制表示的结果
 */
const init = (k, n) => {
    const Bias = Math.pow(2, k - 1);
    const eMax = Math.pow(2, k) - 2;
    const eMin = 1;
    const DenormE =  1 - Bias;
    const EMax = eMax - Bias;
    const EMin = eMin - Bias;

    const K = Math.pow(2, k) - 2;
    const N = Math.pow(2, n);

    var denormArr = [];
    var normArr = [];
    var posArr = [];
    var arr = [];

    // Generate array of possible values of frac
    var fracArr = []
    for (let i = 0; i < N; i++) {
        fracArr.push(i / Math.pow(2, n));
    }

    {
        for (let tempE = EMin; tempE <= EMax; tempE++) {
            let tempEPow = Math.pow(2, tempE);
            fracArr.forEach((element) => {
                normArr.push(tempEPow * (element + 1));
            })
        }
    }

    {
        fracArr.forEach((element) => {
            let DenormEPow = Math.pow(2, DenormE);
            denormArr.push(DenormEPow * (element + 0));
        })
    }

    posArr = normArr.concat(denormArr).sort((a, b) => a - b);
    arr = posArr.concat(posArr.map((element, _) => {
        return -element;
    })).sort((a, b) => a - b);

    console.log(normArr);
    console.log(denormArr);
    console.log(posArr);
    console.log(arr)

    return {
        k: k,
        n: n,
        Bias: Bias,
        eMax: eMax,
        eMin: 1,
        EMax: EMax,
        EMin: EMin,
        FNormAbsMax: Math.max(...normArr),
        FNormAbsMin: Math.min(...normArr),
        FDenormAbsMax: Math.max(...denormArr),
        FDenormAbsMin: Math.min(...denormArr),
        normArr: normArr,
        denormArr: denormArr,
        posArr: posArr,
        arr: arr,
    }
}

init(4, 3)
