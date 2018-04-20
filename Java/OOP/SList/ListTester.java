public class ListTester {
    public static void main(String[] args){
        SinglyLinkedList sList = new SinglyLinkedList();

        sList.add(12);
        sList.add(23);
        sList.add(34);
        sList.add(45);
        sList.add(56);
        sList.add(67);
        sList.add(78);
        sList.add(89);
        sList.add(90);
        sList.printValues();

        Node popped = sList.remove();
        sList.printValues();
        System.out.println(popped.value());
        
        popped = sList.remove();
        sList.printValues();
        System.out.println(popped.value());

    }
}