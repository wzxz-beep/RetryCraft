const assert=require('node:assert/strict');const C=require('../core.js');let n=0;function test(s,f){f();n++;console.log('✓ '+s)}
test('retries transient errors but not validation errors',()=>{assert.equal(C.shouldRetry(503),true);assert.equal(C.shouldRetry(429),true);assert.equal(C.shouldRetry(400),false);assert.equal(C.shouldRetry(401),false)});
test('exponential backoff is capped',()=>{assert.equal(C.retryDelay(1,100,500),100);assert.equal(C.retryDelay(3,100,500),400);assert.equal(C.retryDelay(5,100,500),500)});
test('retry simulation stops on success and limits attempts',()=>{const r=C.simulateRetries(['503','200'],{maxAttempts:4,baseMs:100,maxMs:500});assert.equal(r.result,'success');assert.equal(r.attempts,2);const f=C.simulateRetries(['503','503','503'],{maxAttempts:2});assert.equal(f.result,'failed_exhausted');assert.equal(f.attempts,2)});
test('idempotency replays same payload but rejects changed payload',()=>{const r=C.processIdempotency([{key:'k',payload:'a'},{key:'k',payload:'a'},{key:'k',payload:'b'}]);assert.deepEqual(r.map(x=>x.outcome),['created','replayed','conflict']);assert.equal(r[0].resultId,r[1].resultId)});
test('missing idempotency key is rejected',()=>assert.equal(C.processIdempotency([{payload:'a'}])[0].outcome,'rejected'));
test('circuit opens after threshold and recovers on successful probe',()=>{const r=C.simulateCircuit(['503','503','503','503','200'],3,1);assert.equal(r.events[2].mode,'open');assert.equal(r.finalMode,'closed')});
console.log(`\n${n} tests passed.`);
