import java.util.ArrayList;

public class Group {
    public static void main(String[] args){
        //=== Print numbers 1-255 to the terminal ===//
        int num = 31;
        for(int x = 1; x <= 255; x++){
            if(num == 38){
                num = 31;
            }
            System.out.print("\033[1;"+num+"m "+ x +" \t");
            num++;
        }
        System.out.println("\033[0m");
        

        //=== Create an Array of all the odd numbers fron 1-255 ===//        
        ArrayList<String> oddArray = new ArrayList<String>();
        
        for(int y = 1; y <= 255; y+=2){
            if(num == 38){
                num = 31;
            }
            oddArray.add("\033[1;"+num+"m"+ y +"\033[0m");
            num++;
        }
        System.out.println(oddArray);
        System.out.print("\033[0m");


        //=== Print odd numbers between 1-255 ===//       
        for(int z = 1; z <= 255; z+=2){
            if(num == 38){
                num = 31;
            }
            System.out.print("\033[1;"+num+"m"+ z +"\033[0m");
            num++;
        }
        System.out.print("\033[0m");

        //=== Print Sum ===//
        int sumA = 0;
        for(int a = 0; a <= 255; a++){
            sumA += a;
            System.out.println("New number: "+ a +" Sum: "+ sumA);
        }






    }

}