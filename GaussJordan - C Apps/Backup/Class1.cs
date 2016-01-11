using System;

namespace Gausss_Jordan_Method
{
	class Class1
	{
		static void Main(string[] args)
		{
			Console.Write("Enter the No of System of Equations U want to Solve --- ");
			int no = int.Parse(Console.ReadLine());

			float [,] Mtrx = new float[no,no+1]; // Initializing The Matrix Double Dimiesion
			Mtrx = FilMtrx(Mtrx,no);
			DispMtrx(Mtrx,no);
			Mtrx = Eliminate(Mtrx,no);

			Console.WriteLine();
			Console.WriteLine("The Answer Matrix is");
			DispMtrx(Mtrx,no);
			
			Console.ReadLine();
		}

		static float[,] FilMtrx(float[,] Mtrx , int no)
		{
			Console.WriteLine();
			Console.WriteLine("Enter the values in Matrix");
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
			Console.WriteLine("Displaying the values in Matrix");
			for(int i=0; i<no; i++)
			{
				for(int j=0; j<no+1; j++)
				{
					Console.Write("{0:F2}\t",Mtrx[i,j]);
				}
				Console.WriteLine();
			}
		}

		static float[,] Eliminate(float[,] Mtrx , int no) // To eliminate matrix
		{
			
			for(int i=0; i<no; i++)	// i representing no of rows
			{
				float temp = Mtrx[i,i];

				for(int j=0; j<no+1; j++)	// j representing no of columns
				{
					Mtrx[i,j] = Mtrx[i,j]/temp;  // To Store Multipliers
				}

				for(int k=0; k<no; k++)	// k representing Rows on which operation is
				{						// being performed. To create zeros below & 
					temp = Mtrx[k,i];	// above the main diagonal.
					if (i != k) 
					{
						for(int j=0; j<no+1; j++) // j represents no of colums on which operation is being performed
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
