Program Urut_Bilangan;

Var A, B, C : integer;
Begin {mulai program utama}
Writeln('Program Mengurut Bilangan');
Writeln(' ');
Writeln;
Write('Masukkan Nilai A: ');readln(A);
Write('Masukkan Nilai B: ');readln(B);
Write('Masukkan Nilai C: ');readln(C);
Writeln;
if (A<= B) and (A<= C) then
if (B<= C) then
Writeln(A,' ',B,' ',C)
else
Writeln(A,' ',C,' ',B)
else if (B<= A) and (B<= C) then
if (A<= C) then
Writeln(B,' ',A,' ',C)
else
Writeln(B,' ',C,' ',A)
else if (C<= A) and (C<= B) then
if (A<= B) then
Writeln(C,' ',A,' ',B)
else
Writeln(C,' ',B,' ',A)
End.