
define(["knockout", "text!./paginationGrid.html"], function (ko, paginationGridTemplate) {
function paginationGridViewModel(params) {
var self = this;
self.gridColumns = ko.observableArray(params.gridColumns);
self.gridData = ko.observableArray(params.gridData());
self.currentPage = ko.observable();
self.pageSize = ko.observable(params.pageSize);
self.currentPageIndex = ko.observable(0);
self.pagesNumber =ko.observableArray([1,2]);
ko.postbox.subscribe(function(newValue) {
       self.gridData =  ko.observableArray(newValue);
      self.currentPageIndex(0);
     },self,"updateGrid");
/*var noOfPages = params.gridData().length/params.pageSize;
self.noOfPages = ko.observable(noOfPages);
for(var i=0;i < noOfPages ; i++){
  self.pagesNumber().push(i+1);
}*/
self.currentPage = ko.computed(function ()
{
  var pagesize = parseInt(self.pageSize(), 10),
  startIndex = pagesize * self.currentPageIndex(),
  endIndex = startIndex + pagesize;
  return self.gridData.slice(startIndex, endIndex);
});
self.sortTable = function(order,column){
  self.gridData.sort(function(a, b) {
          if(order == "ascending"){
              return a[column] < b[column] ? -1 : 1;
          }else{
              return a[column] > b[column] ? -1 : 1;
          }

      });
};
self.nextPage = function ()
{
  if (((self.currentPageIndex() + 1) * self.pageSize()) < self.gridData().length)
  {
   self.currentPageIndex(self.currentPageIndex() + 1);
  }
  else
  {
   self.currentPageIndex(0);
  }
};

self.previousPage = function ()
{
  if (self.currentPageIndex() > 0)
  {
   self.currentPageIndex(self.currentPageIndex() - 1);
  }
  else
  {
   self.currentPageIndex((Math.ceil(self.gridData().length / self.pageSize())) - 1);
  }
}
self.jumpToPage = function ($data)
{

   self.currentPageIndex($data-1);

};
self.gridData.sort(function (left, right)
{
    return left.Name < right.Name ? 1 : -1;
});

}

return { viewModel: paginationGridViewModel, template: paginationGridTemplate };
});
