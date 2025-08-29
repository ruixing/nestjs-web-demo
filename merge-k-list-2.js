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
  let mergedList = lists[0];
  for (let i = 1; i < lists.length; i++) {
    mergedList = mergeTwoLists(mergedList, lists[i]);
  }
  return mergedList;
}

const mergeTwoLists = (list1, list2) => {
  if (!list1) return list2;
  if (!list2) return list1;
  
  let head = null;
  let previous = null;
  while (list1 && list2) {
    const firstSmall = list1.val <= list2.val;
    head = head || (firstSmall ? list1 : list2);
    if (firstSmall) {
      if (previous && previous.next !== list1) {
        previous.next = list1;
      }
      if (list1.next) {
        previous = list1;
        list1 = list1.next
      } else {
        list1.next = list2;
        break;
      }
    } else {
      if (previous && previous.next !== list2) {
        previous.next = list2;
      }
      if (list2.next) {
        previous = list2;
        list2 = list2.next
      } else {
        list2.next = list1;
        break;
      }
    }
  }
  return head;
}
