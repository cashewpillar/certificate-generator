# Generated by Django 3.0.6 on 2020-06-17 03:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('learning_api', '0003_account'),
    ]

    operations = [
        migrations.CreateModel(
            name='Certificate',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('certificate_name', models.CharField(max_length=50)),
                ('sample', models.ImageField(blank=True, null=True, upload_to='')),
                ('csv_names', models.TextField(blank=True, default='')),
            ],
        ),
    ]