export default function generateName(){
    let base = ""
    let startconsonants = ["b","c","d","f","g","h",'j','k','l','m','n','p','r','s','t','v','w','y','z','st','br','th','ch','cr']
    let midvowels = ["a","e","i","o","u"]
    let endconsonants = ["b","c","d","f","g","h",'j','k','l','m','n','p','r','s','t','v','w','y','z','st','rm','th','rn']
    let govform = ["_ Republic", "_ Empire", "_ State",]
    base += startconsonants[Math.floor(startconsonants.length*Math.random())]
    base += midvowels[Math.floor(midvowels.length*Math.random())]
    base += endconsonants[Math.floor(endconsonants.length*Math.random())]
    base = base.substring(0,1).toUpperCase() + base.substring(1,base.length)
    // abcdefghijklmnopqrstuvwxyz
    let ethnicityAdjectives = [
        {adjSuffix: "ite", application: "bcdfghjklmnprstvwxyz"},
        {adjSuffix: "ic", application: "bcdfghjklmnprstvwxyz"},
        {adjSuffix: "n", application: "aeiou"},
        {adjSuffix: "ish", application: "bcdfghjklmnpqrtvwxyz"},
        {adjSuffix: "an", application: "bcdfghjklmnprstvwxyz"},
        {adjSuffix: "ch", application: "n"},
        {adjSuffix: "ian", application: "bcdfghjklmnprstvwxyz"},
        {adjSuffix: "ese", application: "bdfghjlmnprsty"},
        {adjSuffix: "i", application: "bcdgjklmnprstvwxyz"},
    ]
    let possEthnicity = []
    for(let i = 0; i<ethnicityAdjectives.length; i++){
        if(ethnicityAdjectives[i].application.includes(base.substring(base.length-1,base.length))){
            possEthnicity.push(ethnicityAdjectives[i].adjSuffix)
        }
    }
    let ethnicityadj = base + possEthnicity[Math.floor(possEthnicity.length*Math.random())];

    let govname = govform[Math.floor(govform.length*Math.random())].replace('_',ethnicityadj)
    return govname
}