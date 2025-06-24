MODULE Test;

FROM StringInOut IMPORT WriteString, WriteLn;

VAR

BEGIN
    FOR i := 1 TO 10 DO
        WriteString("Iteration: ");
        WriteString(i);
        WriteLn();
    END;
END.

