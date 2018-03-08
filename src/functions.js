export function timeFilter(stamp){

    const date = new Date(stamp);



    const hours = date.getHours() - 1;


    const minutes = "0" + date.getMinutes();

    const seconds = "0" + date.getSeconds();


    const formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);


    return formattedTime

}

export function getHiddenProp(){
    var prefixes = ['webkit','moz','ms','o'];

    // if 'hidden' is natively supported just return it
    if ('hidden' in document) return 'hidden';

    // otherwise loop over all the known prefixes until we find one
    for (var i = 0; i < prefixes.length; i++){
        if ((prefixes[i] + 'Hidden') in document)
            return prefixes[i] + 'Hidden';
    }

    // otherwise it's not supported
    return null;
}

export function isToday(tracker){
    const date = new Date(tracker.created)
    const today = new Date(Date.now())

    return today.getDate() + today.getMonth() === date.getDate() + date.getMonth()

}
export function dayOfWeekfromNum(day) {
    switch (day) {
        case 0 : {
            return {
                short: 'Sun',
                full: 'Sunday'
            }
        }
        case 1 : {
            return {
                short: 'Mon',
                full: 'Monday'
            }
        }
        case 2 : {
            return {
                short: 'Tue',
                full: 'Tuesday'
            }
        }
        case 3 : {
            return {
                short: 'Wed',
                full: 'Wednesday'
            }
        }
        case 4 : {
            return {
                short: 'Thu',
                full: 'Thursday'
            }
        }
        case 5 : {
            return {
                short: 'Fri',
                full: 'Friday'
            }
        }
        case 6 : {
            return {
                short: 'Sat',
                full: 'Saturday'
            }
        }
        default: {
            return false
        }
    }
}