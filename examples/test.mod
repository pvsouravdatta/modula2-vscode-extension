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

    FOR i := 1 TO 10 DO
        Show(i + 1);
    END;

    IF i > 10 THEN
        WriteString("Final Fantasy: ");
        WriteInt(i, 3);
        WriteLn;
    END;

    WHILE i < 20 DO
        Show(i);
        i := i + 1;
    END;
END Test.

DEFINITION MODULE Hello;

PROCEDURE Test;

END Hello.

IMPLEMENTATION MODULE Hello;

VAR
    
BEGIN
    
END Hello.
