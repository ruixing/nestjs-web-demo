/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function(head, k) {
  const listLength = (() => {
    let length = 0;
    let current = head;
    while (current) {
      length++;
      current = current.next;
    }
    return length;
  })();

  let first = null;
  let reverseGroupLast = null;
  let currentHead = head;
  for (let i = 0; i < Math.floor(listLength / k); i++) {
    let current = currentHead;
    let previous = null;
    for (let j = 0; j < k - 1; j++) {
      const temp = current.next;
      current.next = previous;
      previous = current;
      current = temp;
    }
    if (i === 0) {
      first = current;
    }
    if (reverseGroupLast) {
      reverseGroupLast.next = current;
    }
    reverseGroupLast = currentHead;
    currentHead.next = current.next;
    currentHead = current.next;
    current.next = previous;
  }
  return first;
};