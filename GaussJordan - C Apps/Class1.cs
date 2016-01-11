using System;

namespace Gausss_Jordan_Method
{
	class Class1
	{
		static void Main(string[] args)
		{
			Console.Write("Masukkan ukuran matrix : ");
			int no = int.Parse(Console.ReadLine());

			float [,] Mtrx = new float[no,no+1]; 
			Mtrx = FilMtrx(Mtrx,no);
			DispMtrx(Mtrx,no);
			Mtrx = Eliminate(Mtrx,no);

			Console.WriteLine();
			Console.WriteLine("Hasil");
			DispMtrx(Mtrx,no);
			
			Console.ReadLine();
		}

		static float[,] FilMtrx(float[,] Mtrx , int no)
		{
			Console.WriteLine();
			Console.WriteLine("Nilai Matrix : ");
			for(int i=0; i<no; i++)
			{
				for(int j=0; j<no+1; j++)
				{
					Console.Write("M[{0},{1}] == ",i,j);
					Mtrx[i,j] = float.Parse(Console.ReadLine());
				}
			}
			return Mtrx;
		}

		static void DispMtrx(float[,] Mtrx , int no)
		{
			Console.WriteLine();
			Console.WriteLine("Menampilkan hasil perhitungan");
			for(int i=0; i<no; i++)
			{
				for(int j=0; j<no+1; j++)
				{
					Console.Write("{0:F2}\t",Mtrx[i,j]);
				}
				Console.WriteLine();
			}
		}

		static float[,] Eliminate(float[,] Mtrx , int no) 
		{
			
			for(int i=0; i<no; i++)	
			{
				float temp = Mtrx[i,i];

				for(int j=0; j<no+1; j++)	
				{
					Mtrx[i,j] = Mtrx[i,j]/temp; 
				}

				for(int k=0; k<no; k++)	
				{						
					temp = Mtrx[k,i];	
					if (i != k) 
					{
						for(int j=0; j<no+1; j++)
						{
							Mtrx[k,j] = Mtrx[k,j] - (temp * Mtrx[i,j]);
						}
					}
				}
				
			}
			return Mtrx;
		}
	}
}
