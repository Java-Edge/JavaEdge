数据结构中的栈，在解决很多问题都有用处，比如括号匹配，迷宫求解，表达式求值等等

java中有封装好的类，可以直接调用：

 

Stack:

 

1-->public Stack()创建一个空堆栈

 

2-->public boolean empty()测试堆栈是否为空;

 

3-->public E pop()移除堆栈顶部的对象，并作为此函数的值返回该对象。 

 

4-->public E push(E item)把项压入堆栈顶部

 

5-->public E peek()查看堆栈顶部的对象，但不从堆栈中移除它。 

 

6-->public boolean empty()测试堆栈是否为空

 

结合一道题目：

 

括号配对问题
描述
现在，有一行括号序列，请你检查这行括号是否配对。
输入
第一行输入一个数N（0<N<=100）,表示有N组测试数据。后面的N行输入多组输入数据，每组输入数据都是一个字符串S(S的长度小于10000，且S不是空串），测试数据组数少于5组。数据保证S中只含有"[","]","(",")"四种字符
输出
每组输入数据的输出占一行，如果该字符串中所含的括号是配对的，则输出Yes,如果不配对则输出No
样例输入
3
[(])
(])
([[]()])
样例输出
No
No
Yes
 

 

代码：
```java
import java.util.Scanner;  
import java.util.Stack;  
  
public class Main {  
    public static void main(String[] args) {  
        Scanner scan = new Scanner(System.in);  
        int N = scan.nextInt();  
        String s;  
        for (int i = 0; i < N; i++) {  
            s = scan.next();  
            if (isMatch(s)) {  
                System.out.println("Yes");  
            } else {  
                System.out.println("No");  
            }  
        }  
    }  
    private static boolean isMatch(String s) {  
        Stack<Character> sk = new Stack<Character>();  
        for (int i = 0; i < s.length(); i++) {  
            if (s.charAt(i) == '(') {  
                sk.push('(');  
            }  
            if (s.charAt(i) == ')') {  
                if (!sk.isEmpty() && sk.pop() == '(')  
                    continue;  
                else  
                    return false;  
            }  
            if (s.charAt(i) == '[') {  
                sk.push('[');  
            }  
            if (s.charAt(i) == ']') {  
                if (!sk.isEmpty() && sk.pop() == '[')  
                    continue;  
                else  
                    return false;  
            }  
        }  
        if (sk.isEmpty())  
            return true;  
        else  
            return false;  
    }  
}          
```
