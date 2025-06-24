MODULE Test;

FROM InOut IMPORT WriteString, WriteLn, WriteInt;

PROCEDURE Show(i: INTEGER);
BEGIN 
    WriteString("Iteration: ");
    WriteInt(i, 3);
    WriteLn();
END Show;

VAR
    i: INTEGER;
BEGIN
    FOR i := 1 TO 10 DO
        Show(i);
    END;
END Test.


