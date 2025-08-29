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
  let previous = null;
  let head = null;
  let notFinish;

  do {
    let min = Number.MAX_SAFE_INTEGER;
    let minPointer = null;
    let index;
    notFinish = false;
  
    for (let i = 0; i < lists.length; i++) {
      const list = lists[i];
      if (list) {
        if (list.val <= min) {
          minPointer = list;
          min = list.val;
          index = i;
        }
        notFinish = true;
      }
    }

    lists[index] = lists[index] && lists[index].next;

    if (!head) {
      head = minPointer;
    }

    if (previous) {
      previous.next = minPointer;
    }
    
    previous = minPointer;
  } while (notFinish);

  return head;
};

