describe("A suite", ()=> {
  it('is a spec', () => {
    expect(1).toBe(1);
  });
  it('is false when expected', () => {
    expect(undefined).toBeFalsy();
    expect(false).toBeFalsy();
    expect(0).toBeFalsy();
  });
});
