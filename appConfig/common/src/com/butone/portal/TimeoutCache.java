package com.butone.portal;

import java.util.Enumeration;
import java.util.Iterator;
import java.util.Vector;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.DelayQueue;
import java.util.concurrent.Delayed;
import java.util.concurrent.TimeUnit;

public class TimeoutCache<K, V> {
	private ConcurrentHashMap<K, V> map = new ConcurrentHashMap<K, V>();
	private DelayQueue<DelayedItem<K>> queue = new DelayQueue<DelayedItem<K>>();
	private Vector<OverdueRemoveListener> listeners = new Vector<OverdueRemoveListener>();
	private volatile boolean stop;

	public interface OverdueRemoveListener<K, V> {
		void onRemove(K key, V v);
	}

	public void addOverdueRemoveListener(OverdueRemoveListener listener) {
		listeners.add(listener);
	}

	public void put(K k, V v, long liveTime) {
		V old = map.put(k, v);
		DelayedItem<K> tmpItem = new DelayedItem<K>(k, liveTime);
		if (old != null) {
			queue.remove(tmpItem);
		}
		queue.offer(tmpItem);
	}

	public V get(K k) {
		return map.get(k);
	}

	public void remove(K k) {
		V old = map.get(k);
		if (old != null) {
			DelayedItem<K> tmpItem = new DelayedItem<K>(k, 0);
			queue.remove(tmpItem);
		}
	}

	/**
	 * 剩余时间
	 * @param k
	 * @return
	 */
	public long escapeTime(K k) {
		synchronized (queue) {

		}
		Iterator<DelayedItem<K>> itor = queue.iterator();
		while (itor.hasNext()) {
			DelayedItem<K> item = itor.next();
			if (item != null && item.t.equals(k)) {
				return TimeUnit.SECONDS.convert(item.removeTime - System.nanoTime(), TimeUnit.NANOSECONDS);
			}
		}
		return 0;
	}

	public boolean containsKey(K k) {
		return map.containsKey(k);
	}

	public TimeoutCache() {
		Thread t = new Thread() {
			@Override
			public void run() {
				dameonCheckOverdueKey();
			}
		};
		t.setName("checkTimeout");
		t.setDaemon(true);
		t.start();
	}

	public void stop() {
		this.stop = true;
	}

	private void dameonCheckOverdueKey() {
		while (!stop) {
			DelayedItem<K> delayedItem = null;
			try {
				delayedItem = queue.take();
			} catch (InterruptedException e1) {
				return;
			}
			if (delayedItem != null) {
				K key = delayedItem.getObject();
				V object = map.remove(key);
				Enumeration<OverdueRemoveListener> itor = listeners.elements();
				while (itor.hasMoreElements()) {
					itor.nextElement().onRemove(key, object);
				}
			}
		}
	}

	class DelayedItem<T> implements Delayed {

		private T t;
		private long startTime;
		private long liveTime;
		private long removeTime;

		public DelayedItem(T t, long liveTime) {
			this.setObject(t);
			this.startTime = System.nanoTime();
			this.liveTime = liveTime;
			this.removeTime = TimeUnit.NANOSECONDS.convert(liveTime, TimeUnit.MILLISECONDS) + this.startTime;
		}

		@Override
		public int compareTo(Delayed o) {
			if (o == null)
				return 1;
			if (o == this)
				return 0;
			if (o instanceof DelayedItem) {
				DelayedItem<T> tmpDelayedItem = (DelayedItem<T>) o;
				if (liveTime > tmpDelayedItem.liveTime) {
					return 1;
				} else if (liveTime == tmpDelayedItem.liveTime) {
					return 0;
				} else {
					return -1;
				}
			}
			long diff = getDelay(TimeUnit.NANOSECONDS) - o.getDelay(TimeUnit.NANOSECONDS);
			return diff > 0 ? 1 : diff == 0 ? 0 : -1;
		}

		@Override
		public long getDelay(TimeUnit unit) {
			return unit.convert(removeTime - System.nanoTime(), unit);
		}

		public T getObject() {
			return t;
		}

		public void setObject(T t) {
			this.t = t;
		}

		@Override
		public int hashCode() {
			return t.hashCode();
		}

		@Override
		public boolean equals(Object object) {
			if (object instanceof DelayedItem) {
				return object.hashCode() == hashCode() ? true : false;
			}
			return false;
		}

	}

}
