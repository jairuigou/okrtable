function date2Str(date)
{
    return date.getFullYear().toString().padStart(4,"0") + "-" + 
            (date.getMonth()+1).toString().padStart(2,"0") + "-" +
              date.getDate().toString().padStart(2,"0") + " " + 
                date.getHours().toString().padStart(2,"0") + ":" +
                  date.getMinutes().toString().padStart(2,"0") + ":" +
                    date.getSeconds().toString().padStart(2,"0"); 
}
function moveToMonthStart(date)
{
  date.setDate(1);
}
function moveToWeekStart(date)
{
  if( date.getDay() == 1 || date.getDate() == 1){
    return;
  }
  date.setDate(date.getDate() - Math.min(date.getDate(),date.getDay() == 0 ? 7: date.getDay()) + 1);
}
function getMonthDay(date)
{
  return new Date(date.getFullYear(),date.getMonth()+1,0).getDate();
}
function getWeekDay(date)
{
  return Math.min((7-date.getDay()) % 7 + 1,getMonthDay(date) - date.getDate() + 1);
}
function getWeekNumber(date)
{
  return (Math.ceil((date.getDate() - date.getDay())/7) + (date.getDay() > 0 ? 1: 0));
}

export {date2Str,moveToMonthStart,moveToWeekStart,getMonthDay,getWeekDay,getWeekNumber};