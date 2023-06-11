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


test_queue();