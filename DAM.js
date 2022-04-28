// Divisor And Multiple (약수와 배수)

module.exports = {
    get
}
function get(Numb, disableLCM) {
    const Numbers = Numb;
    //#region 전체 이용 변수
    let List = [];
    let result = {};
    //#endregion
    //#region 약수 변수
    let MdNumbers = [...Numbers];
    let stopNumIndex = [];
    let AllDivisor = []; // 모든 약수
    let commonFactor = []; // 공약수
    //#endregion
    //#region 배수 변수
    let AllGop = 1; // 모든 숫자의 곱
    let AllMultiple = []; // 모든 배수
    let commonMultiple = []; // 공배수
    //#endregion

    for (let i = 0; i < Numbers.length; i++) {
        const templete = {
            Index: i,
            Number: Numbers[i],
            Divisor: [],
            Multiple: []
        }
        List.push(templete);
    }
    //#region 배수
    if (!disableLCM) {
        for (value of Numbers) AllGop *= value; AllGop /= 100;
        let LCMRepeat = 0;
        while (true) {
            if (LCMRepeat > AllGop) {
                for (item of List) AllMultiple.push(...item.Multiple);
                for (value of AllMultiple) {
                    if (
                        AllMultiple.filter(element => value === element).length === Numbers.length 
                        && 
                        !commonMultiple.includes(value)
                    ) commonMultiple.push(value); // 공배수인지 판단하고, 이미 추가 된 공배수인지도 판단 한 후 넣기
                }
                break;
            }
            for (let i  = 0; i < Numbers.length; i++) {
                for (let j = 0; j < List.length; j++) {
                    if (List[j].Index == i) {
                        List[j].Multiple.push(Numbers[i] * LCMRepeat);
                    }
                }
            }
            LCMRepeat++;
        }
    }
    //#endregion
    //#region 약수
    while (true) {
        for (let i = 0; i < MdNumbers.length; i++) {
            if (MdNumbers[i] == 0) { // 만약에 0이 되었다면
                if (!stopNumIndex.includes(i)) stopNumIndex.push(i); // 더이상 계산이 안되게 stopNumIndex에 index를 넣음
            }
        }
        if (MdNumbers.length == stopNumIndex.length) { // 모든 Index가 stopNumIndex에 들어갔다면
            for (item of List) {
                AllDivisor.push(...item.Divisor) // 모든 약수에 자신의 약수 넣기
            }
            for (value of AllDivisor) {
                if (
                    AllDivisor.filter(element => value === element).length === Numbers.length 
                    && 
                    !commonFactor.includes(value)
                ) commonFactor.push(value); // 공약수인지 판단하고, 이미 추가 된 공약수인지도 판단 한 후 넣기
            }
            break;
        }
        for (let i = 0; i < MdNumbers.length; i++) {
            if (stopNumIndex.includes(i)) continue; // 계산 안 하는 애들
            if (Number.isInteger(Numbers[i] / MdNumbers[i])) { // 소수점이 없다면
                for (let j = 0; j < List.length; j++) { 
                    if (List[i].Index == j) List[i].Divisor.push(MdNumbers[i]); // 약수리스트(List)에서 자신의 리스트를 찾아, 추가함
                }
            }
        }
        for (let i = 0; i < MdNumbers.length; i++) MdNumbers[i]--; // 모든 숫자 1 감소
    }
    //#endregion
    result.List = List;
    result.commonFactor = commonFactor;
    result.GCF = commonFactor[0];
    result.LCM = commonMultiple[1];
    return result; // 출력
}