public class StringManipulator {
    String trimAndConcat(String str1, String str2) {
        return ( str1.trim() + str2.trim() );
    }
    Integer getIndexOrNull(String str, char x){
        int test = str.indexOf(x);
        if (test < 0 ){
            return null;
        } else {
            return test;
        }
    }
    Integer getIndexOrNull(String str, String x){
        int test = str.indexOf(x);
        if (test < 0 ){
            return null;
        } else {
            return test;
        }
    }
    String concatSubstring(String str1, int x, int y, String str2){
        return ( (str1.substring(x,y) + str2 ) );
    }
}