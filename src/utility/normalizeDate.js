import moment from 'moment'

export const normalizeDate = (data, listMonth) => {
  const items = data?.map(item => {
    return {
      month: parseInt(moment(item?.updatedAt).format("M")),
    }
  })
  // console.log("items", items)
  const groupedData = {};

  // Group data based on monthField and sum the valueField for each group
  items.forEach(entry => {
    if (!groupedData.hasOwnProperty(entry.month)) {
      groupedData[entry.month] = 0;
      // console.log("groupedData", groupedData)
    }
    groupedData[entry.month] += 1;
  });

  const collapsedArray = Object.keys(groupedData).map(month => ({
    month: parseInt(month),
    value: groupedData[month],
  }));

  collapsedArray.forEach(d => {
    listMonth.find(w => w.month === d.month).value = d.value
  })

  return listMonth
}