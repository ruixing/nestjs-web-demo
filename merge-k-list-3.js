/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function(lists) {
  const valCount = {};
  for (let list of lists) {
    while(list) {
      const temp = list;
      list = list.next;
      if (valCount[temp.val]) {
        temp.next = valCount[temp.val].head;
        valCount[temp.val].head = temp;
      } else {
        temp.next = null;
        valCount[temp.val] = {
          head: temp,
          tail: temp
        };
      }
    }
  }
  let mergedHead = null;
  let previous = null;
  Object.entries(valCount)
        .sort((a, b) => a[0] - b[0])
        .forEach(([val, { head, tail }]) => {
          if (!mergedHead) {
            mergedHead = head;
          }
          if (previous) {
            previous.next = head;
          }
          previous = tail;
        });
  return mergedHead;
}
