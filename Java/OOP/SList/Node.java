public class Node{
    private int value;
    private Node next;

    public Node(int value, Node next){
        this.value = value;
        this.next = next;
    }
    public Node(int value){
        this.value = value;
        this.next = null; //redundant
    }
    
    public int value(){
        return this.value;
    }
    public Node next(){
        return this.next;
    }

    public void setNext(Node newNext){
        this.next = newNext;
    }

}