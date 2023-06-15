function test_queue(){
    const q = new Queue(10);
    q.push(1);
    q.push(2);
    assert(q.size() === 2);
    assert(q.pop() === 1);
    assert(q.pop() === 2);
    assert(q.is_empty());
    for(let i=0; i<8; i++){
        q.push(i);
    }
    console.log("Queue test 1 passed.")
    
}

function test_minheap(){
    const h = new MinHeap(new ScalarArrCmp());
    h.push([1,1]);
    h.push([1,2]);
    h.push([2,2]);
    h.push([0,2]);
    h.push([-1,-1]);
    h.push([3,1]);
    h.push([-3, 1]);
    h.push([-2]);
    h.push([0,0,0]);

    

}


test_queue();