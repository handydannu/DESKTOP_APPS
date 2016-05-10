program scanner; { judul program}

var
prg_sumber,f_hasil:text;
karakter:Char;
kata,Nm_token:string;

procedure bacafile; { prosedur membaca file sumber }
begin
     read(prg_sumber,karakter);
end;

procedure hasil; {prosedur utk menulis hasil setiap token}
begin
     append(f_hasil); {menambah hasil scan ke file hasil}
     writeln(f_hasil, kata : 15, ' : ', Nm_token);
     writeln(kata : 15, ' : ', Nm_token); {mencetak hasil scan ke layar}
end;

function cekkeyword(s:string):string; {fungsi mengecek keyword atau bukan}
var
   x : byte;
   panjang : integer;
   ftext : text;
   data : string;

begin
     panjang:= length(s); {konversi kata ke huruf kecil}
     for x:=1 to panjang do
     begin
          if s[x]=upcase (s[x]) then
             s[x] := s[x]
          else
             s[x]:= chr(ord(s[x])+32);
     end;

assign(ftext,'keyword.txt');
reset(ftext);
             while not eof(ftext) do {mencocokkan dgn tabel keyword}
             begin
                  readln(ftext,data);
                  if s=data then Nm_token:='Identifier / Keyword';
             end;
close(ftext);
end;

procedure periksa; {prosedur memeriksa setiap karakter file sumber}
begin
while not eof(prg_sumber) do {kerjakan sampai akhir file}
begin
bacafile;

if karakter ='{' then {mengabaikan/membuang komentar}
begin
repeat
begin
bacafile;
end;
until karakter = '}';
kata:='';
end;

if karakter = chr(39) then {mengecek tanda petik (‘)}
begin
repeat
begin
kata := kata + karakter;
bacafile;
end;
until karakter = chr(39) ;
kata := kata + karakter;
Nm_token := 'Konstanta';
hasil;
kata :='';
end;

if (karakter in['A'..'Z','a'..'z','_']) then {mengecek karakter/kata}
begin
repeat
begin
kata := kata + karakter;
bacafile;
end;
until (not(karakter in['A'..'Z','a'..'z','_']));
Nm_token:='Identifier / Variabel';
cekkeyword(kata);
hasil;
kata :='';
end;

if (karakter in['0'..'9']) then {mengecek angka}
begin
repeat
begin
kata := kata + karakter;
bacafile;
end;
until (not(karakter in['0'..'9']));
Nm_token := 'Konstanta / Integer';
hasil;
kata :='';
end;

if (karakter in['+','-','*','/',',','^']) then
begin
repeat
begin
kata := kata+karakter;
bacafile;
end;
until (not(karakter in['+','-','*','/',',','^']));
Nm_token :='Operator';

hasil;
kata:='';
end;

if (karakter in['(',')','[',']','^',':',';',',','.']) then
begin
kata:=karakter;
Nm_token :='Delimiter';
hasil;
kata:='';
end;
end;

end;

begin {=program utama=}

assign(prg_sumber,'URUT.PAS'); {menetapkan file sumber}
reset(prg_sumber); {membaca file sumber}
assign(f_hasil,'hasil.txt'); {menetapkan file hasil}
rewrite(f_hasil); {menghapus isi file hasil}
periksa; {menjalankan prosedur scan}
close(prg_sumber); {menutup file}
close(f_hasil);
readln;
end.