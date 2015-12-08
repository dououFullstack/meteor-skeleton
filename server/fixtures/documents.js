// ***************************************************************
// FIXTURES (generate data for the Documents collection)
// ***************************************************************

if (Documents.find().count() === 0) {

  Documents.insert({
    title: "星期一",
    content: "Lorem ipsum, herp derp durr."
  });

  Documents.insert({
    title: "星期二",
    content: "Lorem ipsum, herp derp durr."
  });

  Documents.insert({
    title: "星期三",
    content: "Lorem ipsum, herp derp durr."
  });

}
