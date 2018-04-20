public class SinglyLinkedList{
    private Node head;

    public SinglyLinkedList(){
        this(null);
    }
    public SinglyLinkedList(Node head){
        this.head = head;
    }

    public Node add(int val){
        Node newNode = new Node(val, null);
        if (this.head == null){
            this.head = newNode;
            return newNode;
        } else {
            Node runner = this.head;
            while(runner.next() != null){
                runner = runner.next();
            }
            runner.setNext(newNode);
            return newNode;
        } 
    } //END add()

    public Node remove(){
        if (this.head == null){
            return null;
        } else if(this.head.next() == null){
            Node rNode = this.head.next();
            this.head = null;
            return rNode;
        } else {
            Node runner = this.head;
            while(runner.next().next() != null){
                runner = runner.next();
            }
            Node rNode = runner.next();
            runner.setNext(null);
            return rNode;
        }
    } //END remove()

    public void printValues(){
        Node runner = this.head;
        while(runner != null){
            if (runner.next() != null){
                System.out.print( runner.value()+ ", ");
            } else {
                System.out.println(runner.value());
            }
            runner = runner.next();
        }
    } //END printValues()





} //END class